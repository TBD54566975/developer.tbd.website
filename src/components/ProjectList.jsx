import React from 'react';
import Project from './Project';
import PropTypes from 'prop-types';
import Divider from './Divider';
const ProjectList = ({ title, projects, growToFit }) => {
  let classGrow =
    'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,minmax(20.75rem,1fr))]';
  if (!growToFit) {
    classGrow = 'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,20.75rem)]';
  }
  return (
    <div className="not-prose">
      {title ? (
        <h1 className="h1 ml-0 text-primary-yellow mb-12">{title}</h1>
      ) : null}
      <div
        className={
          'tablet:gap-x-[1.25rem] desktop:gap-x-8 gap-y-12 tablet:gap-y-[1.375rem] ' +
          classGrow
        }
      >
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
            {index == projects.length - 1 ? null : (
              <div className="block tablet:hidden tablet:mt-[3.5rem]">
                <Divider type="dotted-small" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

ProjectList.propTypes = {
  /**
   * Title of the component
   */
  title: PropTypes.string,
  /**
   * Indicates if the cards should grow in width to fit the available space
   */
  growToFit: PropTypes.bool,
  /**
   * Array of projects
   */
  projects: PropTypes.array.isRequired,
};

ProjectList.defaultProps = {
  growToFit: true,
};

export default ProjectList;
