import RequirePrintingForm from '@/components/ui/forms/ReqPrintingForm';
import ReturnButton from '@/components/ui/ReturnButton';

//Require Printing Page call the form to create a printing order
export default function RequirePrintingPage() {
  return (
    <main className="w-full mt-10 container mx-auto ">
      <ReturnButton />
      <RequirePrintingForm />
    </main>
  );
}
