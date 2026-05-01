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
    headers: { 'Api-Token': AC_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact: { email, firstName, lastName, phone: whatsapp } }),
  })
  const contactData = await contactRes.json()
  const contactId = contactData.contact?.id
  if (!contactId) return

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
    tagId = (await createTagRes.json()).tag?.id
  }
  if (!tagId) return

  await fetch(`${AC_API_URL}/api/3/contactTags`, {
    method: 'POST',
    headers: { 'Api-Token': AC_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }),
  })
}

const credentials = ['Nova CPA', 'CFP®', 'Ancord', 'PQO', 'Nova CPA', 'CFP®', 'Ancord', 'PQO']

export default function CaptacaoPage() {
  const navigate = useNavigate()
  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try { await submitToActiveCampaign(nome, email, whatsapp) } catch { /* continua */ }
    finally { setLoading(false) }
    navigate('/parabens-manbima')
  }

  return (
    <div className="min-h-screen bg-gradient-dark">

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border" style={{ background: 'hsl(220, 28%, 8% / 0.9)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <img
            src="/ls-certificacoes-logo-white.svg"
            alt="Lucas Silva Certificações"
            className="h-9 w-auto"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.className = 'flex items-center gap-2'
              fallback.innerHTML = '<span class="text-2xl">🦈</span><span class="font-body font-bold text-foreground text-sm">Lucas Silva <span class="text-primary">Certificações</span></span>'
              el.parentElement!.insertBefore(fallback, el)
            }}
          />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="bg-secondary border rounded-full px-3 py-1 text-xs text-primary font-body font-bold tracking-wide" style={{ borderColor: 'hsl(210 100% 55% / 0.35)' }}>
              Live gratuita — 11 de Maio
            </span>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-border py-2" style={{ background: 'hsl(220, 28%, 8%)' }}>
        <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
          {[...credentials, ...credentials].map((c, i) => (
            <span key={i} className="text-xs font-body font-bold text-primary/70 tracking-widest uppercase px-4">{c}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <div className="fade-in-up order-2 md:order-1">
            <span className="inline-block bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-body font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
              ● Live gratuita — 11 de Maio
            </span>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Você não precisa{' '}
              <span className="italic">estudar mais.</span>
              <br />
              Precisa estudar{' '}
              <span className="text-gradient-primary">certo.</span>
            </h1>

            <p className="text-lg md:text-xl font-body text-muted-foreground leading-relaxed mb-4">
              O maior erro de quem reprova é tentar aprender do jeito antigo para uma prova que já mudou.
              No dia <strong className="text-foreground">11 de Maio</strong>, o Prof. Lucas Silva vai mostrar ao vivo
              o método que leva à aprovação na <strong className="text-foreground">Nova CPA em até 20 dias</strong>.
            </p>

            <p className="text-base font-body text-muted-foreground leading-relaxed mb-8">
              A live é gratuita. Basta se inscrever — e chegar no dia.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: '📅', text: '11 de Maio — gratuito' },
                { icon: '🎯', text: '+10.000 aprovados' },
                { icon: '✅', text: 'Nova CPA atualizada' },
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
              <cite className="text-sm font-body text-muted-foreground not-italic mt-1 block">— Lucas Silva, CFP® | Nova CPA | Ancord</cite>
            </blockquote>
          </div>

          {/* Foto + Formulário */}
          <div className="order-1 md:order-2 fade-in-up delay-200">
            {/* Foto do Lucas */}
            <div className="relative mb-6 flex justify-center">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 shadow-primary-intense" style={{ borderColor: 'hsl(210 100% 55% / 0.5)' }}>
                <img
                  src="/lucas-silva.jpg"
                  alt="Prof. Lucas Silva"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 15%' }}
                  onError={(e) => {
                    const el = e.currentTarget
                    el.style.display = 'none'
                    el.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-primary flex items-center justify-center text-6xl">🦈</div>'
                  }}
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary rounded-full px-3 py-1 text-xs font-body font-bold text-primary-foreground whitespace-nowrap">
                Prof. Lucas Silva — CFP® | Nova CPA
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-surface-elevated border border-primary/25 rounded-[1.25rem] p-6 shadow-primary-glow">
              {/* Destaque live no topo do form */}
              <div className="rounded-xl px-4 py-3 mb-5 text-center" style={{ background: 'linear-gradient(135deg, hsl(25,95%,52%,0.12), hsl(20,95%,45%,0.06))', border: '1px solid hsl(25,95%,52%,0.35)' }}>
                <p className="text-xs font-body font-bold text-brand-orange uppercase tracking-widest mb-0.5">Live gratuita</p>
                <p className="font-display font-black text-lg text-foreground leading-tight">
                  Como passar na Nova CPA<br />
                  <span className="text-gradient-primary">em até 20 dias</span>
                </p>
                <p className="text-xs font-body text-muted-foreground mt-1">11 de Maio · Online · Gratuito</p>
              </div>

              <h2 className="font-display font-black text-lg text-foreground text-center mb-1">
                Garanta seu lugar na live
              </h2>
              <p className="text-sm font-body text-muted-foreground text-center mb-5">
                Inscrição gratuita — vagas limitadas
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">Seu nome completo</label>
                  <input
                    type="text" required placeholder="Ex: João Silva"
                    value={nome} onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                  />
                </div>
                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">Seu melhor e-mail</label>
                  <input
                    type="email" required placeholder="Ex: joao@gmail.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                  />
                </div>
                <div>
                  <label className="text-sm font-body font-semibold text-muted-foreground mb-1.5 block">WhatsApp (com DDD)</label>
                  <input
                    type="tel" required placeholder="Ex: (11) 99999-9999"
                    value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-[0.75rem] px-4 py-3.5 text-foreground font-body text-base focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-gradient-orange text-white font-body font-extrabold text-lg py-4 px-8 rounded-xl shadow-orange-intense pulse-orange hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Inscrevendo...' : 'QUERO PARTICIPAR DA LIVE GRATUITA 🚀'}
                </button>
              </form>

              <p className="text-xs font-body text-muted-foreground text-center mt-4">
                🔒 Seus dados estão seguros. Sem spam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai aprender na live */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-body font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
            O que acontece na live
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            Em uma noite você vai entender{' '}
            <span className="text-gradient-primary">o que mudou</span>
            <br />e como passar rápido
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🔍',
              title: 'A Nova CPA na prática',
              desc: 'O que mudou na prova, o que caiu fora e o que realmente aparece nas questões de 2026.',
            },
            {
              icon: '⚡',
              title: 'O método dos 20 dias',
              desc: 'O cronograma exato que Lucas usa com os alunos para ir do zero à aprovação sem estudar meses.',
            },
            {
              icon: '🎯',
              title: 'Próximo passo concreto',
              desc: 'Você sai da live com um plano claro de ação — sem confusão, sem desperdício de tempo.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors duration-300">
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
            Esta live é <span className="text-gradient-primary">para você</span> se...
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Quer entrar no mercado financeiro e não sabe por onde começar',
              'Já tentou estudar e não conseguiu passar na prova',
              'Precisa da Nova CPA para ser promovido ou trocar de área',
              'Não tem tempo para estudar meses e quer um caminho direto',
              'Quer aumentar sua renda com uma carreira sólida no financeiro',
              'Está cansado de material desatualizado que não reflete a prova',
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
        <p className="text-sm font-body font-bold text-brand-orange uppercase tracking-widest mb-3">Live gratuita · 11 de Maio</p>
        <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
          Sua aprovação na Nova CPA{' '}
          <span className="text-gradient-primary">começa nessa live</span>
        </h2>
        <p className="text-lg font-body text-muted-foreground mb-8">
          Vagas limitadas. Não deixe para depois.
        </p>
        <button
          onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-block bg-gradient-orange text-white font-body font-extrabold text-lg py-4 px-10 rounded-xl shadow-orange-intense pulse-orange hover:scale-105 transition-all duration-300"
        >
          GARANTIR MEU LUGAR NA LIVE 🦈
        </button>
        <p className="text-xs font-body text-muted-foreground mt-4">Inscrição gratuita · Online · 11 de Maio</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6" style={{ background: 'hsl(220, 28%, 5%)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/ls-certificacoes-logo-white.svg"
            alt="Lucas Silva Certificações"
            className="h-7 w-auto opacity-70"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <p className="text-xs font-body text-muted-foreground text-center">
            LSMC Cursos e Treinamentos | 28.737.851/0001-30
          </p>
          <div className="flex gap-4 text-xs font-body text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
        </div>
        <p className="text-center text-xs font-body text-muted-foreground mt-4">LS Educação — 2026</p>
      </footer>
    </div>
  )
}
