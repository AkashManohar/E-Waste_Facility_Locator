import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { CheckCircle, XCircle } from "lucide-react";

export default function Rules() {
  return (
    <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center text-center">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-green-700">E-Waste Recycling Rules</h1>
      <p className="text-lg text-gray-600 mt-2 max-w-2xl">
        Follow these guidelines to ensure safe and responsible e-waste disposal.
      </p>

      {/* Rules Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 text-left">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Do’s of E-Waste Recycling</h2>
          </div>
          <ul className="list-disc ml-6 text-gray-700 text-left space-y-2">
            <li>Dispose of electronics at certified e-waste centers.</li>
            <li>Remove personal data from devices before recycling.</li>
            <li>Check with local authorities for e-waste disposal programs.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 text-left">
          <div className="flex items-center mb-2">
            <XCircle className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Don’ts of E-Waste Recycling</h2>
          </div>
          <ul className="list-disc ml-6 text-gray-700 text-left space-y-2">
            <li>Do not throw e-waste in regular trash bins.</li>
            <li>Do not burn or dismantle electronics at home.</li>
            <li>Do not mix e-waste with other household waste.</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-700 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="faq-1">
            <AccordionTrigger>Why should I recycle e-waste?</AccordionTrigger>
            <AccordionContent>
              Recycling e-waste helps prevent environmental pollution and allows valuable materials to be reused.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>What items are considered e-waste?</AccordionTrigger>
            <AccordionContent>
              E-waste includes phones, laptops, batteries, televisions, printers, and other electronic devices.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Where can I dispose of my e-waste?</AccordionTrigger>
            <AccordionContent>
              You can dispose of your e-waste at certified recycling centers or designated drop-off locations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
