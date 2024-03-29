"use client"
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname , useRouter } from "next/navigation";

import { updateUser } from "@/lib/actions/user.action";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";

interface Props {
    user : {
        id : string,
        objectId : string,
        username : string,
        name : string ,
        bio : string,
        image : string,
    }
    btnTitle: string,
}

  
function PostThread({userId} : {userId:string}) {
    const router = useRouter()
    const pathname = usePathname()
    const {organization} = useOrganization()
    
    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: '',
          accountId: userId,
        },
      });
    const onSubmit = async (values : z.infer<typeof ThreadValidation>) => {
        await createThread({
            text:values.thread,
            author:userId,
            communityId : organization ?  organization.id : null,
            path : pathname,
        })
        router.push('/')
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  

                Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea 
                    rows={15}
                    
                    // onChange={(e) => handleImage(e , field.onChange)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
                Post Thread
          </Button>
            </form>
        </Form>
    )
}

export default PostThread