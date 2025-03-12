import type { Route } from "../+types/root";

type Contact = {
  id: string;
  createdAt: string;
  avatar: string;
  first: string;
  last: string;
  twitter?: string;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const response = await fetch(
      "https://run.mocky.io/v3/47d491af-ad13-45fb-a81a-3ff273d08643",
    );
    const contacts = await response.json();
    console.log("clientLoader api response", contacts);

    //   setContacts(data);
    return { contacts };
  } catch (err) {
    //   setError("Failed to fetch contacts");
  } finally {
    //   setLoading(false);
  }
}

export default function ContactsList({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;
  console.log("contacts", loaderData);
  if (!loaderData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="contacts-list">
      <h1>Client Side</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <img
              src={contact.avatar}
              alt={`${contact.first} ${contact.last}`}
              width="50"
              height="50"
            />
            <div>
              {contact.first} {contact.last}
            </div>
            {contact.twitter && (
              <div>
                <button onClick={(e) => alert("Clicked" + contact.twitter)}>
                  {contact.twitter}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
