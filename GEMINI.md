Gemini Interaction Guide for Your Ticket Booking Project
Welcome! This guide is designed to help you interact with me, Gemini, in the most effective way possible for your sports ticket booking website. By following these guidelines, you'll get predictable, high-quality results, and we can build this application efficiently.

Core Principles
Be Specific: The more specific your request, the better the output. Instead of "create a booking page," try "create a React component for the booking page that includes a form with fields for sport, date, and time."

Provide Context: Always mention the relevant files, components, or functions we are working on. For example, "In the BookingForm component, add a new field for the number of players."

One Thing at a Time: It's best to focus on one component, function, or feature at a time. This keeps our conversation focused and makes it easier to track changes.

How to Structure Your Requests

1. Creating New Components
   When you need a new component, please provide the following information:

Component Name: e.g., BookingForm, RecentPlayersList.

Purpose: What will this component do?

Props: What data will this component receive? Please specify the types.

State: What state will this component manage?

UI Elements: What should the component look like? Mention any shadcn/ui components you want to use.

Data Fetching: Does it need to fetch data? If so, from which Supabase table and using which query?

Example Request:

"Create a new component named AvailableSlots.tsx in @/app/components/booking/. It should accept a sportId and a selectedDate as props. It needs to fetch available time slots from the slots table for the given sport and date using tanstack-query. Display the slots in a grid. Use the Card and Button components from shadcn/ui to display each slot. When a user clicks a slot, it should call the onSlotSelect function passed in the props."

2. Modifying Existing Components
   When you want to change a component:

Component Name: The name of the component to modify.

Specific Changes: Clearly describe the changes you want to make.

Example Request:

"In the BookingForm component, add a new dropdown field for 'skill level' with options: 'Beginner', 'Intermediate', 'Advanced'. This should be added to the react-hook-form and validated with zod."

3. API Calls and Data Fetching
   For anything related to Supabase or tanstack-query:

Client or Server: Specify if the call is from a client component or a server-side function/component.

Table and Operation: Mention the Supabase table and the operation (select, insert, update, delete).

Real-time: If you need a real-time subscription, be explicit about it.

Example Request:

"Create a tanstack-query hook named useUserProfile that fetches the current user's profile from the profiles table. It should use the createClient() from @/app/utils/supabase/client. The query key should be ['user-profile', userId]."

4. Generating Commit Messages
   When you have uncommitted changes and want a commit message:

Example Request:

"Generate a commit message for the recent changes."

I will then update the commitmessage.txt file with a conventional commit message.

Our Tech Stack and Conventions
I will always adhere to the following:

Frontend: Next.js with the App Router.

Backend: Supabase.

Language: TypeScript.

Data Fetching: TanStack Query (react-query).

Forms: react-hook-form with zod for validation.

UI: shadcn/ui components located in @/src/components/ui.

Animations: framer-motion.

API Calls: axios for external APIs, Supabase client for our backend.

Styling: Tailwind CSS with a dark theme and #8A36EB as the primary accent color.

Supabase Client:

Server: createClient() from @/app/utils/supabase/server.

Client: createClient() from @/app/utils/supabase/client.

Let's get building!
