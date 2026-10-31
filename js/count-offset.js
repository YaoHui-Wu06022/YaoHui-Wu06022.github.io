/* Site counters continue from the Busuanzi totals recorded on 2026-10-31.
   Displayed value = live Vercount value + base below. Article page counts
   have no per-page baseline and are left untouched. */
;(() => {
  const BASE = { site_uv: 20909, site_pv: 42713 }

  const patch = (el) => {
    const text = (el.textContent || '').trim()
    if (el.dataset.vercountOut === text) return
    if (!/^\d[\d,\s]*$/.test(text)) return
    const base = BASE[el.id.slice('busuanzi_value_'.length)]
    if (!base) return
    const out = String(parseInt(text.replace(/\D/g, ''), 10) + base)
    el.dataset.vercountOut = out
    el.textContent = out
  }

  const scan = () => {
    for (const name of Object.keys(BASE)) {
      const el = document.getElementById('busuanzi_value_' + name)
      if (el) patch(el)
    }
  }

  const start = () => {
    scan()
    new MutationObserver(scan).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
