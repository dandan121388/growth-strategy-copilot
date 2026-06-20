export function PageHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-1.5 text-2xl font-bold tracking-tight text-ink">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p></div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>;
}
