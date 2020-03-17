import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favItemUI from "./views/favoriteTickets";

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const form = formUI.form;

    //Events
    form.addEventListener('submit', e => {
        e.preventDefault();
        onFormSubmit();
    });



    
    
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }
    
    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;


        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        ticketsUI.renderTickets(locations.lastSearch);


    }

    document.addEventListener("click", e => {
        if(e.target.classList[5] === 'add-favorite') {
            let index = e.target.id;
            favItemUI.addFavTicket(locations.lastSearch[index]);
        }
        if(e.target.classList[5] === 'delete-favorite') {
            let container = e.target.closest('.favorite-item');
            console.log(container);
            favItemUI.refreshFavLocations(container.id);
            container.innerHTML = '';
        }


    });
});