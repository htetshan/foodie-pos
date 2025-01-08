import BackofficeLayout from "@/components/BackofficeLayout";
import { useSession } from "next-auth/react";

const backofficeApp = () => {
  const { data } = useSession();

  //why use useEffect()
  //1 initial rendering
  //const [name,setName]=useState()
  //2 servercalling function
  //3 name value -> get from server
  //4 state change-> rendering
  //5 but now calling server again
  //6 name value -> get from server again and loop
  //7 Note: server come back code is not same because of different references

  return (
    <BackofficeLayout>
      <h5>{data?.user?.name}</h5>
      <div>backofficeApp site</div>
    </BackofficeLayout>
  );
};

export default backofficeApp;
