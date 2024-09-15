import { kebabCase, kebabArray } from "../../utils/utils";

const projects = [
  {
    id: 0,
    title: "RSVP Movie Case Study",
    desc: "A data analytics project to analyse IMDB dataset using SQL.",
    img: "/projects/RSVP Movies Case Study  SQL Project.jpg",
    // link: "https://learn.theyei.org/",
    github: "https://github.com/bhuvaneshprasad/rsvp_movies_case_study",
    tags: ["SQL"],
  },
  {
    id: 1,
    title: "Telangana Growth Analysis",
    desc: "A real-time data analytics project to analyse the growth of Telangana state between FY2019 and FY2022.",
    img: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1695363338938%2F5726f461-3755-49e4-abb4-cff7a0c78601.png&w=1920&q=75`,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/telangana-growth-analysis`,
    tags: ["SQL", "PowerBI", "Python"],
  },
  {
    id: 2,
    title: "End-to-End IPL Data Analysis",
    desc: "A Python-Powered Exploration through IPL Data with Dynamic Power BI Insights.",
    img: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1704908641555%2Fdf90f7bb-6c9c-4f22-b1c9-2a413fdfa0fc.png&w=1920&q=75`,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/end-to-end-ipl-data-analysis-with-python-and-power-bi`,
    tags: ["SQL", "PowerBI", "Python"],
    
  },
  {
    id: 3,
    title: "Nifty 50 predictor using LSTM",
    desc: "A Long Short-Term Memory(LSTM) model to predict Nifty 50 Index closing price for next trading session.",
    img: `/projects/nifty_predictor.jpg`,
    link: `https://huggingface.co/spaces/bhuvaneshprasad/nifty_predictor`,
    github: "https://github.com/bhuvaneshprasad/nifty50_prediction_using_LSTM_and_keras",
    tags: ["Python", "Time Series Data", "LSTM", "Deep Learning", "Neural Networks"],
  },
  {
    id: 4,
    title: "Enefit - Predict Energy Behavior of Prosumers",
    desc: "ML model for predicting the energy behaviour of the prosumers. ",
    img: `/projects/enefit_prediction.jpg`,
    github: "https://github.com/bhuvaneshprasad/enefit_predict_energy_behaviour",
    tags: ["Python", "Time Series Data", "Decision Tree", "Machine Learning", "Regression"],
  },
  {
    id: 5,
    title: "Classifying Extraterrestrial Signals with Deep Learning",
    desc: "An End-to-End Deep Learning project for classifying SETI signals using Convolutional Neural Networks (CNNs), MLFlow and DVC.",
    img: `/projects/seti-classifier.png`,
    link: `https://huggingface.co/spaces/bhuvaneshprasad/seti-signals-classifier`,
    github: "https://github.com/bhuvaneshprasad/End-to-End-SETI-Classification-using-CNN-MLFlow-DVC",
    tags: ["Python", "Image Classification", "CNN", "Deep Learning", "Neural Networks"],
  },
  {
    id: 6,
    title: "TimeSeries Forecasting on Stock Market Data",
    desc: "A timeseries forecasting project on stock market data using GRU.",
    img: `/projects/nifty_predictor.jpg`,
    link: `https://huggingface.co/spaces/bhuvaneshprasad/timeseries-forecasting`,
    github: "https://github.com/bhuvaneshprasad/TimeSeries-Forecasting-on-Stock-Market-Data",
    tags: ["Python", "Time Aeries Data", "GRU", "Deep Learning", "Neural Networks"],
  },
  {
    id: 7,
    title: "Instance Image Segmentation Using U-Net Architecture",
    desc: "An instance image segmentation deep learning project using U-NET architecture.",
    img: `/projects/instance-image-segmentation.png`,
    github: "https://github.com/bhuvaneshprasad/Instance-Image_segmentation-using-unet-architecture",
    tags: ["Python", "Image Segmentation", "UNET", "Deep Learning", "Neural Networks"],
  },
];

export const allTags = []

projects.forEach((project) => {
  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))
});

export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export const getProjectsByTag = (tag) => {
  const lowercaseTag = tag.toLowerCase();
  return projects.filter(project => project.lowercaseTags.includes(lowercaseTag));
};

// Convert tags to lowercase for each project
projects.forEach(project => {
  project.lowercaseTags = project.tags.map(t => t.toLowerCase());
});

export default projects