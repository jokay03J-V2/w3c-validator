import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {
  MdFastForward,
  MdIntegrationInstructions,
  MdStars,
} from "react-icons/md";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: MdFastForward,
    description: (
      <>
        w3c-validator is easy to use inside node.js app or run into browser with
        his APIs
      </>
    ),
  },
  {
    title: "Read to use inside CI/CD",
    Svg: MdIntegrationInstructions,
    description: <>w3c-validator was designed to work perfectly inside CI/CD</>,
  },
  {
    title: "Beautiful CLI",
    Svg: MdStars,
    description: <>w3c-validator was built to be a cli and js package</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

