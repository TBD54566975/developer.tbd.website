import { Web5 } from "@web5/api";

//Node 18 users: the following 3 lines are needed
import { webcrypto } from "node:crypto";
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;



const { web5, did: userDid } = await Web5.connect();

//Schema we'll use for Book Reviews
const schema = {
  context: "https://schema.org/",
  type: "Review",
  get uri() {
    return this.context + this.type;
  },
};

//Book Reviews
let reviews = [
  {
    "@context": schema.context,
    "@type": schema.type,
    itemReviewed: {
      "@type": "Book",
      name: "The Great Gatsby",
      author: {
        "@type": "Person",
        name: "F. Scott Fitzgerald",
      },
      datePublished: "1925",
      genre: "Fiction",
      identifier: "978-1982149482",
    },
    author: {
      "@type": "Person",
      identifier: userDid,
    },
    datePublished: "2023-09-18",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.5",
    },
    reviewBody:
      "A classic novel with timeless themes and memorable characters. Fitzgerald's prose is simply enchanting.",
  },
  {
    "@context": schema.context,
    "@type": schema.type,
    itemReviewed: {
      "@type": "Book",
      name: "To Kill a Mockingbird",
      author: {
        "@type": "Person",
        name: "Harper Lee",
      },
      datePublished: "1960",
      genre: "Fiction",
      identifier: "978-0446310789",
    },
    author: {
      "@type": "Person",
      identifier: userDid,
    },
    datePublished: "2023-09-18",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5.0",
    },
    reviewBody:
      "A powerful exploration of morality, justice, and the human condition. Truly a must-read.",
  },
  {
    "@context": schema.context,
    "@type": schema.type,
    itemReviewed: {
      "@type": "Book",
      name: "1984",
      author: {
        "@type": "Person",
        name: "George Orwell",
      },
      datePublished: "1949",
      genre: "Dystopian",
      identifier: "978-0451524935",
    },
    author: {
      "@type": "Person",
      identifier: userDid,
    },
    datePublished: "2023-09-18",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.7",
    },
    reviewBody:
      "A disturbing vision of a totalitarian future. Orwell's work is as relevant today as it was when it was first published.",
  },
  {
    "@context": schema.context,
    "@type": schema.type,
    itemReviewed: {
      "@type": "Book",
      name: "Brave New World",
      author: {
        "@type": "Person",
        name: "Aldous Huxley",
      },
      datePublished: "1932",
      genre: "Dystopian",
      identifier: "978-0060850524",
    },
    author: {
      "@type": "Person",
      identifier: userDid,
    },
    datePublished: "2023-09-18",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.8",
    },
    reviewBody:
      "A deeply disturbing yet essential read. Huxley's vision of a future driven by technology and hedonism serves as a potent warning for society.",
  },
];

//Query book review (search for DWN records)
async function getReviews() {
  let { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema: schema.uri,
      },
    },
    dateSort: "createdAscending",
  });
  return records;
}

//checks if review already exists (you may not want duplicate data in the DWN)
async function isReviewPresent(review) {
  for (let record of existingReviews) {
    let bookData = await record.data.json();
    let isbn = bookData.itemReviewed.identifier;

    if (isbn === review.itemReviewed.identifier) {
      return true;
    }
  }
  return false;
}

//Create book review (write record to DWN)
async function addReviews() {
  for (const review of reviews) {
    let reviewExists = await isReviewPresent(review);
    if (reviewExists) {
      console.log(`Review for ${review.itemReviewed.name} already exists`);
    } else {
      const response = await web5.dwn.records.create({
        data: review,
        message: {
          schema: schema.uri,
          dataFormat: "application/json",
          published: true,
        },
      });

      if (response.status.code === 202) {
        console.log(`Review for ${review.itemReviewed.name} added successfully`);
      } else {
        console.log(`${response.status}. Error adding review for ${review.itemReviewed.name}`);
      }
    }
  }
  existingReviews = await getReviews();
}

//Update book review rating
async function updateReviewRating(review, newRating) {
  let bookData = await review.data.json();
  console.log(`old rating for ${bookData.itemReviewed.name}`, bookData.reviewRating.ratingValue);

  //Update the value within the JSON then send the entire JSON to update
  bookData.reviewRating.ratingValue = newRating;
  let response = await review.update({
    data: bookData,
  });

  if (response.status.code === 202) {
    //Obtain the updated record
    const { record: updatedReview } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: review.id
        }
      }
    });

    const updatedData = await updatedReview.data.json();
    console.log(`updated rating for ${bookData.itemReviewed.name}`, updatedData.reviewRating.ratingValue);
  } 
  else console.log(`${response.status}. Error updating rating for ${bookData.itemReviewed.name}`);
}

//Delete all book reviews
async function deleteReviews() {
  let records = await getReviews();

  for (const record of records) {
    let title = (await record.data.json()).itemReviewed.name;
    let response = await web5.dwn.records.delete({
      message: {
        recordId: record.id,
      },
    });
    console.log(`deleted ${title}. status: ${response.status.code}`);
  }
}

let existingReviews = await getReviews();
await addReviews();
await updateReviewRating(existingReviews[1], "4.2");
await deleteReviews();

process.exit();
