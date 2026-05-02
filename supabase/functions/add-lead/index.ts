import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { nome, email, whatsapp, tag } = await req.json();

    if (!nome || !email || !whatsapp || !tag) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: nome, email, whatsapp, tag" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const AC_URL = Deno.env.get("ACTIVECAMPAIGN_API_URL");
    const AC_KEY = Deno.env.get("ACTIVECAMPAIGN_API_KEY");

    if (!AC_URL || !AC_KEY) {
      throw new Error("Credenciais ActiveCampaign não configuradas");
    }

    const headers = {
      "Api-Token": AC_KEY,
      "Content-Type": "application/json",
    };

    const firstName = nome.split(" ")[0];
    const lastName  = nome.split(" ").slice(1).join(" ") || "";

    // 1. Criar/atualizar contato via sync (upsert — funciona com emails novos e já existentes)
    const contactRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contact: { email, firstName, lastName, phone: whatsapp },
      }),
    });
    const contactData = await contactRes.json();
    if (!contactRes.ok) {
      throw new Error(`AC contact/sync falhou [${contactRes.status}]: ${JSON.stringify(contactData)}`);
    }
    const contactId = contactData.contact.id;

    // 2. Buscar ou criar tag
    const tagSearchRes = await fetch(
      `${AC_URL}/api/3/tags?search=${encodeURIComponent(tag)}`,
      { headers }
    );
    const tagSearchData = await tagSearchRes.json();
    const existingTag = tagSearchData.tags?.find((t: { tag: string }) => t.tag === tag);

    let tagId: string;
    if (existingTag) {
      tagId = existingTag.id;
    } else {
      const createTagRes = await fetch(`${AC_URL}/api/3/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tag: { tag, tagType: "contact" } }),
      });
      const createTagData = await createTagRes.json();
      if (!createTagRes.ok) {
        throw new Error(`AC tag creation falhou [${createTagRes.status}]: ${JSON.stringify(createTagData)}`);
      }
      tagId = createTagData.tag.id;
    }

    // 3. Aplicar tag ao contato (422 = tag já aplicada, ignorar)
    await fetch(`${AC_URL}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }),
    });

    // 4. Inscrever na lista 102
    await fetch(`${AC_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: { list: "102", contact: contactId, status: "1" },
      }),
    });

    return new Response(JSON.stringify({ ok: true, contact_id: contactId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Erro AC:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
