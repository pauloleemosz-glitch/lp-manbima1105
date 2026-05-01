import { useEffect } from 'react'

const WHATSAPP_GROUP_LINK = 'https://bit.ly/4txHgcH'

declare global {
  interface Window { dataLayer: unknown[] }
}

export default function ObrigadoPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'Lead' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">

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
          <span className="bg-success/15 text-green-400 text-xs font-body font-bold px-3 py-1 rounded-full">
            Lead confirmado ✓
          </span>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">

          {/* Ícone de sucesso */}
          <div className="text-7xl mb-6 animate-float">🦈</div>

          <span className="inline-block bg-success/15 border border-success/30 text-green-400 text-xs font-body font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
            Inscrição confirmada
          </span>

          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Parabéns!{' '}
            <span className="text-gradient-primary">Você está dentro</span>{' '}
            da Missão ANBIMA.
          </h1>

          <p className="text-lg md:text-xl font-body text-muted-foreground leading-relaxed mb-4">
            Sua inscrição foi confirmada. Agora entre no grupo exclusivo da Missão ANBIMA
            para receber o material, tirar dúvidas e começar hoje mesmo.
          </p>

          <p className="font-body text-base text-muted-foreground mb-10">
            <strong className="text-foreground">Próximo passo:</strong> clique no botão abaixo e entre no grupo do WhatsApp.
          </p>

          {/* Banner destaque */}
          <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg, hsl(25,95%,52%,0.1), hsl(20,95%,45%,0.05))', border: '1px solid hsl(25,95%,52%,0.3)' }}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-4xl">📱</div>
              <div className="text-left">
                <p className="font-body font-bold text-foreground">Grupo exclusivo Missão ANBIMA</p>
                <p className="text-sm font-body text-muted-foreground">Acesso imediato · Material completo · Suporte diário</p>
              </div>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-orange text-white font-body font-extrabold text-xl py-5 px-12 rounded-xl shadow-orange-intense pulse-orange hover:scale-105 transition-all duration-300"
          >
            ENTRAR NO GRUPO DA MISSÃO 🚀
          </a>

          <p className="text-xs font-body text-muted-foreground mt-4">
            Acesso gratuito · Link direto para o WhatsApp
          </p>

          {/* O que esperar */}
          <div className="mt-16 bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display font-black text-2xl text-foreground mb-6">
              O que você vai receber no grupo:
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              {[
                { icon: '📚', title: 'Material atualizado', desc: 'Apostila e simulados alinhados às provas de 2026' },
                { icon: '🎯', title: 'Plano de estudos', desc: 'Cronograma de 20 dias para aprovar com foco total' },
                { icon: '💬', title: 'Suporte direto', desc: 'Tire dúvidas com o Prof. Lucas e outros alunos' },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <div className="text-3xl">{item.icon}</div>
                  <p className="font-body font-bold text-foreground text-sm">{item.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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
