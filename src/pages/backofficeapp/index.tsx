import BackofficeLayout from "@/components/BackofficeLayout";
import { useSession } from "next-auth/react";

const backofficeApp = () => {
  const { data } = useSession();

  return (
    <BackofficeLayout>
      <h5>{data?.user?.name}</h5>
      <div>backofficeApp site</div>
    </BackofficeLayout>
  );
};

export default backofficeApp;
