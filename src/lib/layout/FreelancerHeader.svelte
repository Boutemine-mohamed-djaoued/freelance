<script>
	import { session } from '$lib/stores/Session.js';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import { onMount } from 'svelte';
	let explore = [
		{ path: '/freelancer/feed', value: 'feed' },
		{ path: '/client/createGig', value: 'Create Gig' },
		{ path: '/client/dashboard', value: 'dashboard' },
		{ path: '/', value: 'Explore 4' }
	];
	let jobs = [
		{ path: '/', value: 'job 1' },
		{ path: '/', value: 'job 2' },
		{ path: '/', value: 'job 3' },
		{ path: '/', value: 'job 4' }
	];
	let navbar, burgerButton;
	onMount(() => {
		burgerButton = document.querySelector('.bergur-menu');
		navbar = document.querySelector('nav');
	});
	const handleNavbarVisibility = () => {
		if (navbar) {
			if (navbar.getAttribute('navbarVisibility') === 'false') {
				navbar.setAttribute('navbarVisibility', 'true');
			} else if (navbar.getAttribute('navbarVisibility') === 'true') {
				navbar.setAttribute('navbarVisibility', 'false');
			}
		}
	};
	const consolData = () => {
		handleNavbarVisibility();
	};
</script>

<header class="wrapper border-b-2 h-14 md:h-20 sticky top-0 w-full bg-off-white z-[9999]">
	<div class="text-400 flex items-center font-bold bg-off-white">
		<!-- burger menu button -->
		<button
			on:click={() => {
				handleNavbarVisibility();
			}}
			class="burger-menu shrink-0 md:hidden mr-auto"
		>
			<img src="/home/header/burgerMenu.svg" alt="" />
		</button>
		<a href="/" class="text-primary-300 text-500 max-md:ml-3 md:mr-7">Freeli</a>
		<nav navbarVisibility="false" class="max-md:w-0 md:w-full">
			<ul class="font-semibold bg-off-white">
				<li
					on:click={() => {
						handleNavbarVisibility();
					}}
					class="md:hidden p-2"
				>
					<a href="/freelancer">Home</a>
				</li>
				<li class="jobs">
					<Dropdown on:receiveData={consolData} title={'Jobs'} options={jobs}></Dropdown>
				</li>
				<li
					on:click={() => {
						handleNavbarVisibility();
					}}
					class="mr-auto p-2"
				>
					<a href="/messeges">messages</a>
				</li>
				<li>
					<button on:click={() => ($session = 'register')} class="max-md:focus:text-primary-300 max-md:w-full p-[0.5em] focus-visible:ring-2 ring-black rounded-sm">
						<a href="/register">
							<img class="inline-block" src="/home/header/Globe.png" alt="" /> English
						</a>
					</button>
				</li>
				<li class="explore">
					<Dropdown on:receiveData={consolData} title={'Explore'} options={explore}></Dropdown>
				</li>
				<li>
					<img class="max-md:hidden" src="/freelancer/header/bell.svg" alt="" />
					<a class="md:hidden inline-block p-2" href="/"> Notifications </a>
				</li>
			</ul>
		</nav>
		<div class="ml-auto md:ml-5">
			<img class="max-md:w-10" src="/defaultProfile.svg" alt="" />
		</div>
	</div>
</header>

<style>
	@media (max-width: 767px) {
		ul {
			@apply absolute top-[3rem] h-[100vh] w-full left-0 px-5 py-3;
		}
		nav ul {
			transition: transform 0.7s ease-in-out;
			z-index: -1;
		}

		ul li {
			@apply border-b-2;
		}
		nav[navbarVisibility='false'] ul {
			transform: translateY(-120%);
		}
		ul li button {
			text-align: left;
		}
	}
	@media (min-width: 768px) {
		ul {
			@apply flex items-center gap-5;
		}
		ul li:hover:not(.explore, .jobs, .messages) {
			@apply text-primary-300;
			cursor: pointer;
		}
	}
</style>
