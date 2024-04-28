// import { useUser } from "@clerk/clerk-react";
// import { Liveblocks } from "@liveblocks/node";

// const liveblocks = new Liveblocks({
//   secret: "sk_dev_m3sdPcD6dNhWxk_10d3nfFw7zzYbdYGgadLd8NKR3WiEuIjJ2xffQm0rOlzBv3wd",
// });

// export async function POST(request: Request) {
//   // Get the current user from your database
//   const { user } = useUser();

//   // Start an auth session inside your endpoint
//   const session = liveblocks.prepareSession(
//     user?.id || "anonymous",
//     {
//       userInfo: {
//         name: user?.fullName || "Anonymous",
//         avatar: user?.imageUrl,
//         colors: [
//           "#ACDC79",
//           "#A6EF67",
//           "#73E2A3",
//           "#5FE9D0",
//           "#67E3F9",
//           "#7CD4FD",
//           "#84CAFF",
//           "#84ADFF",
//           "#A4BCFD",
//           "#C3B5FD",
//           "#BDB4FE",
//           "#EEAAFD",
//           "#FAA7E0",
//           "#FEA3B4",
//           "#FF9C66",
//           "#F7B27A",
//           "#FDE272",
//         ],
//       },
//     }, // Optional
//   );

//   // Use a naming pattern to allow access to rooms with wildcards
//   // Giving the user read access on their org, and write access on their group
//   // session.allow(`${user?.fullName}:*`, session.READ_ACCESS);
//   session.allow(`${user?.fullName}:*`, session.FULL_ACCESS);
//   // session.allow(`${user?.fullName}:${user.group}:*`, session.FULL_ACCESS);

//   // Authorize the user and return the result
//   const { status, body } = await session.authorize();
//   return new Response(body, { status });
// }
