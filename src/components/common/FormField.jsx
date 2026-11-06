function FormField({
  id,
  name,
  label,
  error,
  as = 'input',
  className = '',
  children,
  ...props
}) {
  const Component = as

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>

      <Component
        id={id}
        name={name ?? id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-nx-surface px-4 text-sm text-white placeholder:text-nx-muted focus:outline-none ${
          as === 'textarea' ? 'py-3' : 'h-12'
        } ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-nx-border focus:border-nx-cyan'
        }`}
        {...props}
      >
        {children}
      </Component>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField