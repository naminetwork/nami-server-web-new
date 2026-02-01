import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeIcon as Icon } from 'lucide-react'; // Placeholder if needed

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Map Mintlify components to Fumadocs
    Tip: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Callout title={title} type="info" icon={undefined}>
        {children}
      </Callout>
    ),
    Note: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Callout title={title} type="info">
        {children}
      </Callout>
    ),
    Warning: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Callout title={title} type="warn">
        {children}
      </Callout>
    ),
    Info: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Callout title={title} type="info">
        {children}
      </Callout>
    ),
    Check: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Callout title={title} type="info" icon={undefined}>
        {children}
      </Callout>
    ),
    Card: Card,
    Cards: Cards,
    Accordion: Accordion,
    AccordionGroup: Accordions,
    Tabs: Tabs,
    Tab: Tab,
    Step: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <div className="step">
        {title && <h3 className="font-bold">{title}</h3>}
        {children}
      </div>
    ),
    Steps: ({ children }: { children: React.ReactNode }) => (
      <div className="steps-container ml-4 border-l pl-4 border-slate-200 dark:border-slate-800">
        {children}
      </div>
    ),
    ...components,
  };
}
