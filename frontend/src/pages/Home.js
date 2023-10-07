import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log("Fetching");
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  return <div className="home"></div>;
};

export default Home;
