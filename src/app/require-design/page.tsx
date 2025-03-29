import RequestForm from "@/components/ui/reqDesignForm"
import connectDb from "@/lib/dbConnect"

const RequireDesignPage = async() => {
  await  connectDb()
  return (<>
    <main className="w-full mt-40 container mx-auto">
      <RequestForm />
    </main>
  </>
  )
}

export default RequireDesignPage