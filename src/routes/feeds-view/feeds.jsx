import { useEffect, useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import {
  Container,
  GridContainer,
  Card,
  CardImage,
  CardTitle,
  DetailContainer,
  DetailImage,
  BackButton,
} from "./feeds.style";

function Feed() {
  const [feeds, setFeeds] = useState([]);

  //   useEffect(() => {
  //     const fetchFeeds = async () => {
  //       const snapshot = await db
  //         .collection("feeds")
  //         .orderBy("createdAt", "desc")
  //         .get();
  //       setFeeds(snapshot.docs.map((doc) => doc.data()));
  //     };
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const feedsCollectionRef = collection(db, "feeds"); // Akses koleksi 'feeds'
        const feedsQuery = query(
          feedsCollectionRef,
          orderBy("createdAt", "desc")
        ); // Query Firestore
        const snapshot = await getDocs(feedsQuery); // Ambil dokumen
        setFeeds(snapshot.docs.map((doc) => doc.data())); // Simpan data di state
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };
    fetchFeeds();
  }, []);

  return (
    <Container>
      {selectedProduct ? (
        <DetailContainer>
          <DetailImage
            src={selectedProduct.imageURL}
            alt={selectedProduct.title}
          />
          <h2>{selectedProduct.title}</h2>
          <p>{selectedProduct.description}</p>
          <BackButton onClick={() => setSelectedProduct(null)}>Back</BackButton>
        </DetailContainer>
      ) : (
        <GridContainer>
          {feeds.map((feed, index) => (
            <Card key={index} onClick={() => handleProductClick(feed)}>
              <CardImage src={feed.imageURL} alt={feed.title} />
              <CardTitle>{feed.title}</CardTitle>
            </Card>
          ))}
        </GridContainer>
      )}
    </Container>
  );
}

export default Feed;
