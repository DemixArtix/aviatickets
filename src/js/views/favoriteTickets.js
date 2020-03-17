import currencyUI from "./currency";

class ObjOfFavorites {
    constructor(currency) {
        this.dropdown = document.getElementById('dropdown1');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
        this.favLocations = [];
    }


    addFavTicket(locations) {
        Object.defineProperty(locations, 'id',  {
            value: Math.random(),
            writable: true,
            enumerable: true,
            configurable: true,
        });
        const currency = this.getCurrencySymbol();
        const favTicket = ObjOfFavorites.favTicketTemplate(locations, currency);
        this.dropdown.insertAdjacentHTML('beforeend', favTicket);
        this.favLocations.push(locations);
        console.log(this.favLocations);
    }

    refreshFavLocations(id) {
        let itemForDelete = this.favLocations.indexOf(this.favLocations.find(item => item.id === parseFloat(id)));
        this.favLocations.splice(itemForDelete, 1);
        console.log(this.favLocations);
    }


    static favTicketTemplate(ticket, currency) {
        return`
       <div class="favorite-item  d-flex align-items-start" id="${ticket.id}">
            <img
                src="${ticket.airline_logo}"
                class="favorite-item-airline-img"
            />
                <div class="favorite-item-info d-flex flex-column">
                <div
                    class="favorite-item-destination d-flex align-items-center"
                >
                    <div class="d-flex align-items-center mr-auto">
                                    <span class="favorite-item-city">${ticket.origin_name}</span>
                                    <i class="medium material-icons">flight_takeoff</i>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="medium material-icons">flight_land</i>
                                    <span class="favorite-item-city">${ticket.destination_name}</span>
                                </div>
                            </div>
                            <div class="ticket-time-price d-flex align-items-center">
                                <span class="ticket-time-departure">${ticket.departure_at}</span>
                                <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                            </div>
                            <div class="ticket-additional-info">
                                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                            </div>
                            <a
                                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                            >Delete</a
                            >
                        </div>
                    </div>`;
    }
}


const favItemUI = new ObjOfFavorites(currencyUI);

export default favItemUI;



