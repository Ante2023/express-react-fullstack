import QuoteComponent from "./QuoteComponent";

const CardComponent = (props) => {
  // console.log(props);
  return (
    <div>
      {props.quotesArray.map((item, key) => (
        <QuoteComponent key={key} objectQuote={item} />
      ))}
    </div>
  );
};

export default CardComponent;
