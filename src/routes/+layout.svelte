<script lang="ts">
   import { user, userData } from '$lib/stores'
   import '../app.css'

   $user
   $userData
</script>

<div class="min-h-screen flex flex-col"><slot /></div>
