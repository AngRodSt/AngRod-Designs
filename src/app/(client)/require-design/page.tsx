import ReturnButton from '@/components/ui/ReturnButton';
import RequireDesignForm from '@/components/ui/forms/ReqDesignForm';

//Require Design Page call the form to create a design order
const RequireDesignPage = async () => {
  return (
    <main className="w-full mt-10 container mx-auto ">
      <ReturnButton />
      <RequireDesignForm />
    </main>
  );
};

export default RequireDesignPage;
