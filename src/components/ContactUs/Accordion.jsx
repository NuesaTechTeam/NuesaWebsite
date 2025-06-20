import { Accordion } from "radix-ui"
import { faqData } from "../../lib/constants"
import { ChevronDown } from "lucide-react";
import React from "react";
import classNames from "classnames";

const AccordionDemo = () => {
    return (
      <div className="flex flex-col gap-y-6">
        {faqData.map((item, index) => (
          <Accordion.Root
            key={index}
            className='w-full max-w-3xl mx-auto rounded-md bg-white shadow-md shadow-black/50'
            type='single'
            collapsible
          >
            <AccordionItem
              value={`item-${index + 1}`}
              className='border-b border-gray-200'
            >
                <AccordionTrigger className='text-lg font-semibold text-gray-800'>
                  {item.question}
                </AccordionTrigger>
              <Accordion.Content className='p-4 text-gray-700'>
                {item.answer}
              </Accordion.Content>
            </AccordionItem>
          </Accordion.Root>
        ))}
      </div>
    );
}

const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={classNames("mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black/20", className,)}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
)
)
const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className='flex p-4'>
      <Accordion.Trigger
        className={classNames(
          "group flex flex-1 items-center gap-x-4 justify-between bg-white px-2 leading-none outline-non hover:bg-white/80 cursor-pointer",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDown
          className='text-green transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180 size-9'
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        "overflow-hidden bg-gray-50 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown ", className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="px-5 py-2">{children}</div>
    </Accordion.Content>
  )
);
export default AccordionDemo