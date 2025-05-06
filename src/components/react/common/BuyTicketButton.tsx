import { Icon } from "@iconify/react";

const BuyTicketButton = () => (
  <a href="https://www.eventpop.me/e/85285/pycon-thailand-2025">
    <button className="ml-2 flex w-max items-center bg-primary p-2 text-white">
      Buy Ticket
      <Icon className="ml-2" icon="ion:ticket-outline" />
    </button>
  </a>
);

export default BuyTicketButton;
