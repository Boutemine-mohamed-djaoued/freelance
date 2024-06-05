export default function (date) {
  let diff = new Date().getTime() - new Date(date).getTime();
  if (diff < 60000) return "Just now"
  else if (diff < 60000 * 60) return Math.floor(diff / 60000) + " minutes ago"
  else if (diff < 60000 * 60 * 60) return Math.floor(diff / 60000 / 60) + " hours ago"
  else if (diff < 60000 * 60 * 60 * 24) return Math.floor(diff / 60000 / 60 / 24) + " days ago"
  else if (diff < 60000 * 60 * 60 * 24 * 7) return Math.floor(diff / 60000 / 60 / 24 / 7) + " weeks ago"
  else if (diff < 60000 * 60 * 60 * 24 * 30) return Math.floor(diff / 60000 / 60 / 24 / 30) + " months ago"
  else if (diff < 60000 * 60 * 60 * 24 * 365) return Math.floor(diff / 60000 / 60 / 24 / 365) + " years ago"
  return diff;
}