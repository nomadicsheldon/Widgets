# Widgets
**In this app we are using wikipedia API for search, google translate API for translation**

Main focus of this project is- Hooks(useState, useEffect, useRef)

Point to note -
- Hooks is for functional components only.
- `useEffect` doesn't allow async directly inside this function.
- `useEffect` only allow us to return a function.
- `useRef`

---

## Implementation description

Folder Structure -

- components
  - Accordion.js
  - Convert.js
  - Dropdown.js
  - Header.js
  - Link.js
  - Route.js
  - Search.js
  - Translate.js
- App.js

---

### `Accordion.js` -
using **Array desturcturing** getting and setting state, we are defining initial state as `null`.
```javascript
const [activeIndex, setActiveIndex] = useState(null);
```

`onTitleClick` using for setting `state`.
`renderedItems` rendering all elements and setting active element style according to the state.

### `Search.js` -
setting default state for term as "programming", resposible for search term.
```javascript
const [term, setTerm] = useState("programming");
```
setting default state for debouncedTerm as "programming", using term for it to avoid static string and for one point of change. It is responsible for search optimization.
```javascript
const [debouncedTerm, setDebouncedTerm] = useState(term);
```
setting default state for results as `[]`, resposible for search result.
```javascript
const [results, setResults] = useState([]);
```
triggering every time when `term` value changes. It will handle delaying in API call for 1sec, this will save API calls. Before 1sec if term updates then timer of 1sec will start again as we are setting it and removing previous timer.
```javascript
useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedTerm(term);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [term]);
```
Trigger everytime `debouncedTerm` value changes. `useEffect` doesn't allow async directly inside this function that's why we are assigning it to `const` and calling it.
```javascript
useEffect(() => {
		const search = async () => {
			const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
				params: {
					action: "query",
					list: "search",
					origin: "*",
					format: "json",
					srsearch: debouncedTerm,
				},
			});

			setResults(data.query.search);
		};
		search();
	}, [debouncedTerm]);
```
`renderedResults` responsible for rendering UI.
`dangerouslySetInnerHTML` will display text and ignore html tags, it will cause security issue and your website will be easily harmed by `Cross Site Scripting`(XSS).
```javascript
<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
```
### `Dropdown.js` -
using **Array desturcturing** getting and setting state, we are defining initial state as `false`.
```javascript
const [open, setOpen] = useState(false);
```
for getting reference of current element
```javascript
const ref = useRef();
```
Will run first time render only because we defined as `[]`.
```
useEffect(() => {
		...
	}, []);
```
this function will check for whether we clicked outside the current component.
```javascript
const onBodyClick = (event) => {
			if (ref.current.contains(event.target)) {
				console.log("3rd");
				return;
			}
			setOpen(false);
		};
```
setting event listener for `click` event.
```javascript
document.body.addEventListener("click", onBodyClick);
```
remove event listener when we will move to other screen.
```javascript
document.body.removeEventListener("click", onBodyClick);
```
`renderedOptions` responsible for UI.
this will hide currently selected option from the list.
```javascript
if (option.value === selected.value) {
			return null;
		}
```
assigning reference of current element in `ref`
```javascript
<div ref={ref} className="ui form">
```
`onClick` change the selected state.
```javascript
onClick={() => setOpen(!open)}
```

### `Translate.js` -
A Simple component which takes `language` and `text` state and passing it to `Convert`.

### `Convert.js` -
This component is responsible for converting language and API call of google translate.

