import { selectEntryById } from "../services/service";
import header from "../header";
import write from "../new.png";

var showdown = require("showdown"),
  converter = new showdown.Converter({ metadata: true }),
  text =
    "# this is a title \n * bulletpoint 1 \n * bulletpoint 2 \n* bulletpoint 3",
  html = converter.makeHtml(text);

export default function showEntryPage({ id }, user) {
  return selectEntryById(id, user.uid).then((entry) => showEntry(entry[0]));
}

const createDiaryItem = () => {
  const item = document.createElement("li");
  item.className = "show-item";
  return item;
};

const createItemTitle = (entry) => {
  const itemTitle = document.createElement("h3");
  itemTitle.id = "show-entry-title";
  itemTitle.innerHTML = entry.title;
  return itemTitle;
};

const createItemEntry = (entry) => {
  const itemEntry = document.createElement("p");
  itemEntry.className = "show-item-entry";
  html = converter.makeHtml(entry.entry);
  itemEntry.innerHTML = html;
  return itemEntry;
};

const createItemLinkToArticle = (entry) => {
  const linkToArticle = document.createElement("a");
  linkToArticle.href = entry.link;
  linkToArticle.text = "Link to article";
  return linkToArticle;
}; // temporary until markdown module is implemented

function showEntry(entry) {
  const show = document.createElement("div");
  show.id = "show-entry";
  show.append(createEntryPage(entry));
  return show;
}

function createEntryPage(entry) {
  const div = document.createElement("div");
  div.className = "show-entry-page";
  const headers = header("show", write, `/edit/${entry.id}`, "Edit item");
  const item = createDiaryItem();
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);
  const linkToArticle = createItemLinkToArticle(entry);

  item.append(itemTitle);
  item.append(itemEntry);
  item.append(linkToArticle);
  div.append(headers);
  div.append(item);
  return div;
}
