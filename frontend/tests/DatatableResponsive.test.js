import React from 'react';
import DatatableResponsive from '../components/DatatableResponsive';
import renderer from 'react-test-renderer';

test('Tests  DatatableResponsive render', () => {
  const component = renderer.create(
    <DatatableResponsive/>,
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});