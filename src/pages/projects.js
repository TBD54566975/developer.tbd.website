import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Card from '../components/Card/Card';
import { content } from '@site/src/content/projects.js';
import { Illustration } from '../components/Illustration';

export default function ReactPage() {
  return (
    <Layout>
      <div className="container">
        <h1 className='h1'>{content.title}</h1>
        <h1 className='h1'>{content.subtitle}</h1>
        <section className='pt-20'>
          <h4 className='h4'>List of projects</h4>

          <div className="row pt-10">
            {content.projects.map((props, idx) => (
              <>
              <div className={clsx('col col--3')} key={idx}>
              <Card icon={"/img/union-icon.svg"} content={props.description} link={props.url} />
              </div>
              </>
            ))}
          </div>
        </section>
        <div className="flex-row pt-10 flex justify-center">
        <Illustration
            img={'/img/projects-divider.svg'}
            className={'w-12/12 p-3 relative'}
          />
        </div>

        <section>
          <div className="row pt-10 flex justify-around">
            <div className={clsx('col col--4')}> 
               <h1 className="h1">{content.prototyping.title}</h1>
               <h3 className="h3 pt-5">{content.prototyping.subtitle}</h3>
            </div>
            <div className={clsx('col col--4')}> 
              <h4 className='h4 pb-5'>We believe open source is not a publishing medium.</h4>
              <p className='pb-5'>These projects are open from the start to welcome your interest, invite discussion, identify early issues, and advise on design.</p>
              <p className='pb-5'> An early adopter mindset will work well until these projects mature further.</p>
              <p className='pb-5'> The Discussion Forums and Issue Tracker are likely the best way to get involved now. Our project leads may be able to guide your efforts and incorporate your feedback in ways that will be most meaningful to you and the project's goals.</p>
              <p className='pb-5'> In particular, we want to ensure the New Contributor Experience is as smooth as possible. You should be able to:</p>
              <p className='pb-5'>* Understand each project's goals and scope</p>
              <p className='pb-5'>* Install prerequisite dependencies</p>
              <p className='pb-5'>* Clone and build the project</p>
              <p className='pb-5'> * Run the tests</p>
              <p className='pb-5'>* Join the conversation in Discussions and Issues</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
