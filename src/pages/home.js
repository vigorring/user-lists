import React, { useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mockupData } from "../mock/mockdata";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  toggle: Yup.boolean().oneOf([true], "Message"),
});

export default function TreeViewFile() {
  const [selectedNode, setSelectedNode] = useState({});
  const [selectedRoot, setSelectedRoot] = useState({});
  const [treeViewArr, setTreeViewArr] = useState([]);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    // This will be called for each new value of selectedNode, including the initial empty one
    // Here is where you can make your API call
    // console.log("selectedNode", selectedNode);
    // console.log("selectedRoot", selectedRoot);
    console.log('change')
    getTreeViewData();
  }, [userInfo]);

  const handleChange = (event, nodeId) => {
    treeViewArr.forEach((treeRoot) => {
      if (treeRoot.id === nodeId) {
        setSelectedRoot(treeRoot);
        setSelectedNode(treeRoot);
        return;
      }

      handleSelectedNode(treeRoot.childNodes, treeRoot, nodeId);
    });
  };

  const handleSelectedNode = (childNodes, treeRoot, nodeId) => {
    if (!childNodes) {
      return;
    }

    for (let i = 0; i < childNodes.length; i++) {
      let childNode = childNodes[i];
      if (childNode.id === nodeId) {
        setSelectedRoot(treeRoot);
        setSelectedNode(childNode);
        return;
      }

      handleSelectedNode(childNode.childNodes || [], treeRoot, nodeId);
    }
  };

  const displayTreeView = (treeViewArray) => {
    if (!treeViewArray) {
      return null;
    }
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
    setTreeViewArr(mockupData)
  }

  const saveData = (username, selNode) => {
    console.log(selNode.id)
    console.log(username)
    setUserInfo(username)
  };

  return (
    <>
      <>
        <div className="container mx-auto px-4 mt-50 flex justify-evenly flex-col md:flex-row w-screen m-3 flex-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Formik
              initialValues={{
                username: "",
                toggle: false,
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
                // save updated data
                saveData(values.username, selectedNode);
              }}
            >
              {({ errors, touched }) => (
                <Form className="p-30">
                  <h1 className="text-3xl font-bold mb-10">
                    Please enter your name and pick the Sectors you are
                    currently involved in.
                  </h1>
                  <div className="mb-10 flex items-center">
                    <p className="text-gray-700 text-sm font-bold">Name :</p>
                    <Field
                      className="border border-[#5f5f5f] rounded-md ml-2"
                      name="username"
                    />
                    {touched.username && errors.username && (
                      <div>{errors.username}</div>
                    )}
                  </div>
                  <div className="sectors mb-10">
                    <label>Sectors : </label>
                    <TreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpanded={["1"]}
                      defaultExpandIcon={<ChevronRightIcon />}
                      sx={{
                        height: 240,
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
                  <div className="agree mb-10">
                    <Field type="checkbox" name="toggle" />
                    <label>Agree to terms</label>
                    {touched.toggle && errors.toggle && (
                      <div>{errors.toggle}</div>
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
        </div>
      </>
    </>
  );
}
