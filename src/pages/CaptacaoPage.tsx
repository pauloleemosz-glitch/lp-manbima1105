import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const AC_API_URL = 'https://professorlucassilva38279.api-us1.com'
const AC_API_KEY = '777b287f89a6dd172db6f5a728b1d79c22bbfea984b112c06ee71728e43f70c4d443ecf0'
const AC_TAG    = '[MANBIMA] - Leads LS1105'

declare global {
  interface Window { dataLayer: unknown[] }
}

async function submitToActiveCampaign(nome: string, email: string, whatsapp: string) {
  const firstName = nome.split(' ')[0]
  const lastName  = nome.split(' ').slice(1).join(' ')

  const contactRes = await fetch(`${AC_API_URL}/api/3/contacts`, {
    method: 'POST',
    headers: {
      'Api-Token': AC_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: {
        email,
        firstName,
        lastName,
        phone: whatsapp,
      },
    }),
  })
  const contactData = await contactRes.json()
  const contactId = contactData.contact?.id

  if (!contactId) return

  // Get or create tag
  const tagsRes = await fetch(
    `${AC_API_URL}/api/3/tags?filters[tag]=${encodeURIComponent(AC_TAG)}`,
    { headers: { 'Api-Token': AC_API_KEY } }
  )
  const tagsData = await tagsRes.json()
  let tagId = tagsData.tags?.[0]?.id

  if (!tagId) {
    const createTagRes = await fetch(`${AC_API_URL}/api/3/tags`, {
      method: 'POST',
      headers: { 'Api-Token': AC_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: { tag: AC_TAG, tagType: 'contact' } }),
    })
    const createTagData = await createTagRes.json()
    tagId = createTagData.tag?.id
  }

  if (!tagId) return

  await fetch(`${AC_API_URL}/api/3/contactTags`, {
    method: 'POST',
    headers: { 'Api-Token': AC_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }),
  })
}

const credentials = ['CPA-10', 'CPA-20', 'CEA', 'Ancord', 'PQO', 'CFP®']

export default function CaptacaoPage() {
  const navigate = useNavigate()

  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await submitToActiveCampaign(nome, email, whatsapp)
    } catch {
      // silently continue — don't block lead conversion on AC errors
    } finally {
      setLoading(false)
    }
    navigate('/parabens-manbima')
  }

  return (
    <div className="min-h-screen bg-gradient-dark">

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border" style={{ background: 'hsl(220, 28%, 8% / 0.9)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦈</span>
            <div>
              <span className="font-body font-bold text-foreground text-sm">Lucas Silva</span>
              <span className="font-body text-primary text-sm ml-1">Certificações</span>
            </div>
          </div>
          <span className="bg-secondary border rounded-full px-3 py-1 text-xs text-primary font-body font-bold tracking-wide" style={{ borderColor: 'hsl(210 100% 55% / 0.35)' }}>
            Missão ANBIMA
          </span>
        </div>
      </header>

      {/* Marquee de credenciais */}
      <div className="overflow-hidden border-b border-border py-2" style={{ background: 'hsl(220, 28%, 8%)' }}>
        <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
          {[...credentials, ...credentials].map((c, i) => (
            <span key={i} className="text-xs font-body font-bold text-primary/70 tracking-widest uppercase px-4">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <div className="fade-in-up order-2 md:order-1">
            <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-body font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
              Missão ANBIMA — Maio 2026
            </span>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Você não precisa{' '}
              <span className="italic">estudar mais.</span>
              <br />
              Precisa estudar{' '}
              <span className="text-gradient-primary">certo.</span>
            </h1>

            <p className="text-lg md:text-xl font-body text-muted-foreground leading-relaxed mb-8">
              O maior erro de quem reprova é usar o método antigo para uma prova que já mudou.
              Com o método certo, a aprovação vem em{' '}
              <strong className="text-foreground">15 a 20 dias</strong> — não em meses.
            </p>

            {/* Provas sociais rápidas */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: '🎯', text: '+10.000 aprovados' },
                { icon: '⚡', text: 'Método atualizado 2026' },
                { icon: '✅', text: 'CPA-10, CPA-20, CEA' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5">
                  <span>{item.icon}</span>
                  <span className="text-xs font-body font-semibold text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-[3px] border-primary pl-4 py-3 pr-6 rounded-r-xl" style={{ background: 'hsl(210 100% 55% / 0.08)' }}>
              <p className="font-display font-bold italic text-lg text-primary">
                "Saia do cardume. Vire tubarão."
              </p>
              <cite className="text-sm font-body text-muted-foreground not-italic mt-1 block">— Lucas Silva, CFP® | CPA-20 | CEA</cite>
            </blockquote>
          </div>

          {/* Foto + Formulário */}
          <div className="order-1 md:order-2 fade-in-up delay-200">
            {/* Foto do Lucas */}
            <div className="relative mb-6 flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 shadow-primary-intense" style={{ borderColor: 'hsl(210 100% 55% / 0.5)' }}>
                <img
                  src="/lucas-silva.jpg"
                  alt="Prof. Lucas Silva"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const el = e.currentTarget
                    el.style.display = 'none'
                    el.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-primary flex items-center justify-center text-6xl">🦈</div>'
                  }}
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary rounded-full px-3 py-1 text-xs font-body font-bold text-primary-foreground whitespace-nowrap">
                Prof. Lucas Silva — CFP® | CPA-20
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-surface-elevated border border-primary/25 rounded-[1.25rem] p-6 shadow-primary-glow">
              <h2 className="font-display font-black text-xl text-foreground text-center mb-1">
                Quero minha certificação ANBIMA
              </h2>
              <p className="text-sm font-body text-muted-foreground text-center mb-5">
                Acesse o treinamento gratuitamente agora
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">
                    Seu nome completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  />
                </div>

                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">
                    Seu melhor e-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: joao@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                  />
                </div>

                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">
                    WhatsApp (com DDD)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (11) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                  />
                </div>

                {error && (
                  <p className="text-xs font-body text-urgency text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-orange text-white font-body font-extrabold text-lg py-4 px-8 rounded-xl shadow-orange-intense pulse-orange hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Enviando...' : 'QUERO MINHA CERTIFICAÇÃO ANBIMA 🚀'}
                </button>
              </form>

              <p className="text-xs font-body text-muted-foreground text-center mt-4">
                🔒 Seus dados estão seguros. Sem spam, prometemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-body font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
            Por que a Missão ANBIMA funciona
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            O método que <span className="text-gradient-primary">já aprovou</span>
            <br />mais de 10.000 alunos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📚',
              title: 'Conteúdo 100% atualizado',
              desc: 'Material alinhado às provas de 2026. Sem apostila velha, sem gabaritar o que não cai mais.',
            },
            {
              icon: '⚡',
              title: 'Do zero à aprovação em 20 dias',
              desc: 'Método de estudo estruturado que elimina o desperdício de tempo e foca só no que cai.',
            },
            {
              icon: '🎯',
              title: 'Suporte e comunidade exclusiva',
              desc: 'Grupo de apoio com alunos ativos, resolução de dúvidas e motivação diária para não desistir.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors duration-300 fade-in-up">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display font-black text-xl text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem é */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: 'linear-gradient(135deg, hsl(210,100%,55%,0.08), hsl(215,100%,45%,0.04))', border: '1px solid hsl(210,100%,55%,0.2)' }}>
          <h2 className="font-display font-black text-3xl md:text-4xl text-foreground text-center mb-8">
            Esta missão é <span className="text-gradient-primary">para você</span> se...
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Quer entrar no mercado financeiro, mas não sabe por onde começar',
              'Já tentou estudar antes e não conseguiu passar na prova',
              'Precisa da certificação para ser promovido ou trocar de área',
              'Não tem tempo para estudar do zero e quer um caminho direto',
              'Quer aumentar sua renda com uma carreira sólida no financeiro',
              'Está cansado de material desatualizado que não reflete a prova real',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-success text-lg mt-0.5 flex-shrink-0">✓</span>
                <span className="font-body text-base text-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
          Sua certificação está{' '}
          <span className="text-gradient-primary">a 20 dias</span> de distância
        </h2>
        <p className="text-lg font-body text-muted-foreground mb-8">
          Não espere mais. O próximo passo é agora.
        </p>
        <button
          onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-block bg-gradient-orange text-white font-body font-extrabold text-lg py-4 px-10 rounded-xl shadow-orange-intense pulse-orange hover:scale-105 transition-all duration-300"
        >
          QUERO COMEÇAR AGORA 🦈
        </button>
        <p className="text-xs font-body text-muted-foreground mt-4">Acesso gratuito · Sem compromisso</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6" style={{ background: 'hsl(220, 28%, 5%)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦈</span>
            <span className="font-body font-bold text-foreground text-sm">Lucas Silva Certificações</span>
          </div>
          <p className="text-xs font-body text-muted-foreground text-center">
            LSMC Cursos e Treinamentos | 28.737.851/0001-30
          </p>
          <div className="flex gap-4 text-xs font-body text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
        </div>
        <p className="text-center text-xs font-body text-muted-foreground mt-4">
          LS Educação — 2026
        </p>
      </footer>
    </div>
  )
}
