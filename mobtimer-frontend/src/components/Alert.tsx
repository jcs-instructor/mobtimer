const AlertBox = ({ message }: { message: string }) => {
  return (
    <div className={"AlertBox"}>
      <h1>{message}</h1>
    </div>
  );
};

export default AlertBox;
