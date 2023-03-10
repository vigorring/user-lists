import React, { useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mockupData } from "../mock/mockdata";

import { Formik, Form, Field } from "formik";
import { validationSchema } from "../helper/validator";
import { listToTree } from "../helper/listToTree";

export default function Card(props) {
  const [selectedNode, setSelectedNode] = useState({});
  const [treeViewArr, setTreeViewArr] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    getTreeViewData();
  }, [userInfo]);

  const handleChange = (event, nodeId) => {
    treeViewArr.forEach((treeRoot) => {
      if (treeRoot.id === nodeId) {
        setSelectedNode(treeRoot);
        return;
      }
      handleSelectedNode(treeRoot.childNodes, treeRoot, nodeId);
    });
  };

  const handleSelectedNode = (childNodes, treeRoot, nodeId) => {
    if (!childNodes) return;
    for (let i = 0; i < childNodes.length; i++) {
      let childNode = childNodes[i];
      if (childNode.id === nodeId) {
        setSelectedNode(childNode);
        return;
      }
      handleSelectedNode(childNode.childNodes || [], treeRoot, nodeId);
    }
  };

  const displayTreeView = (treeViewArray) => {
    if (!treeViewArray) return null;
    return treeViewArray.map((treeViewItem) => {
      return (
        <TreeItem
          key={treeViewItem.id}
          nodeId={`${treeViewItem.id}`}
          label={treeViewItem.title}
        >
          {displayTreeView(treeViewItem.childNodes)}
        </TreeItem>
      );
    });
  };

  const getTreeViewData = () => {
    console.log(props.cardNumber);
    let treeData = JSON.parse(localStorage.getItem(props.cardNumber));
    if (!treeData) treeData = mockupData;
    setTreeViewArr(listToTree(treeData));
  };

  const saveData = (username, selNode) => {
    setUserInfo(username);
    let updateData = JSON.parse(localStorage.getItem(props.cardNumber));
    if (!updateData) updateData = mockupData;
    for (let i = 0; i < updateData.length; i++) {
      if (updateData[i].id === selNode.id) {
        updateData[i].title = username;
      }
    }
    localStorage.setItem(props.cardNumber, JSON.stringify(updateData));
    setTreeViewArr(listToTree(updateData));
  };

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-5">
        <Formik
          initialValues={{
            username: "",
            toggle: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveData(values.username, selectedNode);
          }}
        >
          {({ errors, touched }) => (
            <Form className="p-30">
              <h1 className="text-16 font-medium mb-20">
                Please enter your name and pick the Sectors you are currently
                involved in.
              </h1>
              <div className="mb-10">
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm mr-10">Name :</p>
                  <Field
                    className="border border-slate-300 rounded-md ml-2 pl-10  pr-10"
                    name="username"
                  />
                </div>
                {touched.username && errors.username && (
                  <div className="text-red-500 text-10 ml-60 ">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="sectors mb-10">
                <label>Sectors : </label>
                <TreeView
                  className="border border-slate-300 rounded-md"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={["1"]}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    height: 400,
                    flexGrow: 1,
                    maxWidth: 600,
                    overflowY: "auto",
                  }}
                  onNodeSelect={handleChange}
                >
                  {displayTreeView(treeViewArr)}
                </TreeView>
                This is the selectedNode: {selectedNode?.title}
              </div>
              <div className="mb-20">
                <div className="agree flex items-center">
                  <Field
                    type="checkbox"
                    name="toggle"
                    className="w-15 h-15 mr-5"
                  />
                  <label>Agree to terms</label>
                </div>
                {touched.toggle && errors.toggle && (
                  <div className="text-red-500 text-10">{errors.toggle}</div>
                )}
              </div>
              <div className="actions">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-20 rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
