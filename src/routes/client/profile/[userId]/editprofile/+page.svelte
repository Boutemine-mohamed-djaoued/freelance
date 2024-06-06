<script>
	import ContentOutside from '../../../Components/Popup/ContentOutside.svelte';
	import Content from '../../../Components/Popup/Content.svelte';
  import Modal from '../../../Components/Popup/Modal.svelte';
	import Popup from '../../../Components/Popup/Popup.svelte';
	import { modal } from '../../../Components/Popup/stores.js';
	console.log({$modal})
</script>

<Modal show={$modal}>
	<Content />
</Modal>