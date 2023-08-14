<script>
   import { userData } from '$lib/stores'
</script>

<svelte:head>
   <title>Pwa.ps - a place for links</title>
   <meta name="description" content="Demo project for the Full SvelteKit Course by Fireship" />
</svelte:head>

<main class="flex w-full min-h-screen">
   <div class="hero bg-base-200">
      <div class="hero-content text-center">
         <div class="w-full">
            <h1 class="text-7xl font-bold">Pwa.ps</h1>
            <p class="py-6 text-2xl">One simple link to share your entire developer portfolio</p>
            {#if $userData?.username}
               <a href="/login" class="btn btn-primary">Login/Logout</a>

               <a href="/{$userData.username}/edit" class="btn btn-primary">Edit Profile</a>
            {:else}
               <a href="/login" class="btn btn-primary">Get Started</a>
               <a href="/Pwaps" class="btn btn-secondary">Example Profile</a>
            {/if}
            <p class="py-6">
               I learned it in the <a class="link" href="https://fireship.io/courses/sveltekit"
                  >Fireship Full SvelteKit Course</a
               >
            </p>
         </div>
      </div>
   </div>
</main>
