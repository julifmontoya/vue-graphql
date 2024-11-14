<template>
  <header>
    <div class="wrapper">
      <nav><RouterLink to="/">Home</RouterLink> |</nav>
      <nav><RouterLink to="/rocket">Rocket</RouterLink></nav>
      <nav><RouterLink to="/mutation">Mutation</RouterLink></nav>
    </div>
  </header>

  <RouterView />
</template>
