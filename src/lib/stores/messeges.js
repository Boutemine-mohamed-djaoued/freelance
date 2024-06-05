import { writable } from "svelte/store";

let chatBool = writable(false);
export let chatState = chatBool;
export let chatRoom = writable(null);
export let messages = writable([]);
export let chats = writable([]);