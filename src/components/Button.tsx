type ButtonProps = {
  children: React.ReactNode
  href?: string
}

export default function Button({ children, href }: ButtonProps) {
  // If href is external, use <a>, otherwise Link if internal (but href here seems generic)
  // The provided example used <a>. I'll stick to <a> for external or internal for now as per snippet,
  // but better to use Link for internal. I'll check if href starts with http.
  // Actually, the snippet provided in instructions used <a>. I will use the snippet EXACTLY as requested
  // but maybe genericize to use Link if it's a relative path?
  // The user prompt snippet:
  /*
    <a
      href={href}
      className="inline-block border border-gold text-gold px-6 py-3 uppercase tracking-widest text-sm hover:bg-gold hover:text-navy transition"
    >
      {children}
    </a>
  */
  // I will stick to the provided snippet for Button.tsx to be safe, but add Link from next/link if I modify it.
  // For now, I'll paste the provided code.

  return (
    <a
      href={href}
      className='inline-block border border-gold text-gold px-6 py-3 uppercase tracking-widest text-sm hover:bg-gold hover:text-navy transition'>
      {children}
    </a>
  )
}
