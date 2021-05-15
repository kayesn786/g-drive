import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders } = useFolder(folderId, state.folder);
  return (
    <>
      <Navbar />
      <div className="d-flex align-item-center mr-3 ml-3 mt-1">
        <FolderBreadcrumbs currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
      </div>
      <Container fluid>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
