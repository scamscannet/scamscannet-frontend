<script>
    import "../app.css";
    import {Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
</script>

<svelte:head>
    <title>ScamScan</title>

    <meta name="twitter:title" content="ScamScan | Find - Fight - Prevent online fraud" />
    <meta name="twitter:description" content="ScamScan makes the internet safer with innovative scam detection techniques." />
    <meta name="description" content="ScamScan makes the internet safer with innovative scam detection techniques. We detect, monitor and fight fraud to make the world wide web a safer place." />
</svelte:head>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img
                src="https://assets.interbloc.org/images/logo/Interbloc/logo_blue.png"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
        />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      ScamScan
    </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/services">Services</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi href="/contact">Contact</NavLi>
    </NavUl>
</Navbar>
<div class="container mx-auto">
    <slot />
</div>