<script>
    import "../app.css";
    import {
        Button,
        Footer,
        FooterCopyright, FooterLink,
        FooterLinkGroup,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl
    } from "flowbite-svelte";
    import { userStore } from "../store/user";
    import { setContext } from 'svelte';
    import {isUserLoggedIn, logout} from "../hook/auth";
    let authenticated = isUserLoggedIn();
    userStore.subscribe(value => authenticated = isUserLoggedIn());


    import { page } from '$app/stores';
    let path;

    function getPath(currentPath) {
        path = currentPath;
    }

    $: getPath($page.url.pathname);

</script>

<svelte:head>
    <title>ScamScan</title>

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="twitter:title" content="ScamScan | Find - Fight - Prevent online fraud" />
    <meta name="twitter:description" content="ScamScan makes the internet safer with innovative scam detection techniques." />
    <meta name="description" content="ScamScan makes the internet safer with innovative scam detection techniques. We detect, monitor and fight fraud to make the world wide web a safer place." />
</svelte:head>

<div class="flex flex-col justify-between w-full min-h-screen">
    <div>
        <Navbar let:hidden let:toggle>
            <NavBrand href="/">
                <img
                        src="https://assets.interbloc.org/images/logo/Interbloc/logo_blue.png"
                        class="mr-3 h-6 sm:h-9"
                        alt="Interbloc logo"
                />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      ScamScan
    </span>
            </NavBrand>
            <div class="flex md:order-2">
                {#if (authenticated)}
                    <Button on:click={logout} size="sm">Logout</Button>
                {:else }
                    <Button on:click={() => {window.location = "/authentication/login?source=" + $page.url.pathname.substring(1)} } size="sm">Login</Button>
                {/if}
                <NavHamburger on:click={toggle}/>
            </div>
            <NavUl {hidden}>
                <NavLi href="/" active={path === '/'}>Home</NavLi>
                <NavLi href="/about-us" active={path === '/about-us'}>About Us</NavLi>
                <NavLi href="/account" active={path.startsWith('/account')}>Account</NavLi>
            </NavUl>
        </Navbar>


        <div class="mb-auto container px-1 md:px-0 mx-auto mb-12">
            <slot />
        </div>

    </div>

    <!-- Footer -->
    <div class="container mx-auto ">
        <Footer>
            <FooterCopyright href="/" by="ScamScan™" year={2023} />
            <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <FooterLink href="/">About</FooterLink>
                <FooterLink href="/">Privacy Policy</FooterLink>
                <FooterLink href="/">Contact</FooterLink>
                <FooterLink href="https://bgjar.com">BGJar (SVG)</FooterLink>
            </FooterLinkGroup>
        </Footer>
    </div>
</div>
