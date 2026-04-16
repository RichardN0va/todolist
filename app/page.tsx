export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-top items-center font-sans">
      <div>
        <h1>List</h1>
      </div>
      <div>
        <form method="post">
          <input type="text" />
          <button type="submit">submit</button>
        </form>

      </div>
      <div>
        <li>Shopping</li>
        <li>Studying</li>
        <li>Working out</li>
        <li>Cleaing</li>
      </div>
    </div>
  );
}
