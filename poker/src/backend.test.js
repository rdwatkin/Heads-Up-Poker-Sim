import fire from './config/fire';
import App from './App';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const fakeUser = {
	name: "John Doe",
	age: "33",
	address: "204 High Street"
}


it("uploads and downloads from firebase", async() => {

	act(() => {
		fire.database().ref("/Root/Test/").set({ fakeUser });
	})
	
	fire.database().ref("/Root/Test/").once('value', snapshot => {
		var user = snapshot.child("fakeUser").val()
		expect( user ).toBe( fakeUser )
	});


})