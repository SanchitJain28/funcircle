Project Goal : This is Ticket booking website ,Espically for sports activities like badminton and other activities
key technologies : Nextjs App router as frontend , Supabase for backend , Using React query or tanstack query for data fetching ,using realtime supabase for incoming Requests , This app is using Typescript so make sure types are there
Key functionalities : users cam book Ticket , Can send other users (Recently played with) requests for making duos
Coding Conventions : All components should be functional components with TypeScript
App theme : Dark , With colors like #8A36EB

SQL table definitions are in `database_schema.sql`

For Forms : Use React-hook-form and zod for validation
For animations : use motion animation library from 'motion/react'\
For UI components : use Shadcn and components in @src/components/ui
For API Calls : use axios
For Calling Supabase :

1. From server : const supabase = await createClient() , where createClient() from @/app/utils/supabase/server
   2.From client : const supabase = createClient(), where createClient() from @/app/utils/supabase/client

-If i say you to make a commit message for the uncomitted changes then update the `commitmessage.txt` file
