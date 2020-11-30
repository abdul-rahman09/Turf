import * as React from "react";
import { PureComponent } from "react";

interface If {
  info: any;
}

export default class CityInfo extends PureComponent<If> {
  render() {
    const { info } = this.props;
    const displayName = `${info.city}, ${info.state}`;

    return (
      <div>
        <div>
          {displayName} |{" "}
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
        </div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}
