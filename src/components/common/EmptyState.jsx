import Button from './Button'

function EmptyState({ icon: Icon, title, text, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-nx-border bg-nx-card/40 px-6 py-16 text-center">
      {Icon && (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-nx-cyan/10 text-nx-cyan">
          <Icon className="h-8 w-8" />
        </span>
      )}
      <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm text-nx-muted">{text}</p>}
      {actionLabel && actionTo && (
        <Button to={actionTo} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState