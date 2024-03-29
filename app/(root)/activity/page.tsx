import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id)
    return (
      <section>
          <h1 className="head-text mb-10">Activity</h1>
          <section className="mt-10 flex flex-col gap-5">
            {activity.length > 0? (
              <>
              {activity.map((acti) => (
                  <Link key={acti._id} href={`/thread/${acti.parentId}`}>
                    <article className="activity-card">
                      <Image 
                        src={acti.author.image}
                        alt="Profile Picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">{acti.author.name}</span>{' '} 
                        replied to yourThread!
                      </p>
                    </article>
                  </Link>
              ) )}
              </>
            ):(
              <p className="!text-base-regular text-light-3">No Activity yet</p>
            )}
          </section>
      </section>
    )
  }
  
  export default Page