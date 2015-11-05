package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.NonUiOperationDao;
import com.automationtool.webportal.dao.OperationDao;
import com.automationtool.webportal.dao.UiOperationDao;
import com.automationtool.webportal.model.NonUiOperations;
import com.automationtool.webportal.model.Operations;
import com.automationtool.webportal.model.UiOperations;
import com.automationtool.webportal.model.webservices.NonUIOperation;
import com.automationtool.webportal.model.webservices.OperationsList;
import com.automationtool.webportal.model.webservices.UiOperationObj;


@Service("operationService")
@Transactional
public class OperationServiceImpl implements OperationService {

	@Autowired
	private OperationDao dao;
	
	@Autowired
	private NonUiOperationDao nonUi;
	
	@Autowired
	private UiOperationDao ui;
	
	@Override
	public List<Operations> findAllOperations() {
		return dao.findAllOperations();
	}

	@Override
	public Operations findOperationByKeyword(String keyword) {
		return dao.findOperationByKeyword(keyword);
	}

	@Override
	public OperationsList findAllOperationName() {
		OperationsList oprList = null;
		try {
			List<Operations> list = dao.findAllOperationName();
			if(list.size()==0 || (list==null)) {
				throw new Exception("No Operation Returned");
			}
			
			oprList = new OperationsList();
			
			oprList.setStatus("SUCCESS");
			oprList.setOperationList(list);
			
		} catch(NullPointerException e) {
			oprList = new OperationsList("ERROR", "Null Pointer Exception");
		}	
			catch (Exception e) {
		
			oprList = new OperationsList("ERROR", e.getMessage());
			e.printStackTrace();
		}
		return oprList;
	}

	@Override
	public NonUIOperation getNonUiOperationByName(String operationName) {
		NonUIOperation operation = null;
		
		try {
			NonUiOperations opr = nonUi.getNonUiOperationByName(operationName);
			if(opr == null) {
				throw new Exception("No Operation returned with operationName: " + operationName);
			}
			operation = new NonUIOperation();
			operation.setStatus("SUCCESS");
			operation.setOperation(opr);
		}  catch(NullPointerException e) {
			operation = new NonUIOperation("ERROR", "Null Pointer Exception");
		}	
			catch (Exception e) {
		
				operation = new NonUIOperation("ERROR", e.getMessage());
			e.printStackTrace();
		} finally {
			
			return operation;
		}
	}

	@Override
	public UiOperationObj getUiOperationByName(String operationName) {
		UiOperationObj operation =null;
		
		try {
			UiOperations opr = ui.getNonUiOperationByName(operationName);
			if(opr == null) {
				throw new Exception("No Operation returned with operationName: " + operationName);
			}
			operation = new UiOperationObj();
			operation.setStatus("SUCCESS");
			operation.setOperation(opr);
		}  catch(NullPointerException e) {
			operation = new UiOperationObj("ERROR", "Null Pointer Exception");
		}	
			catch (Exception e) {
		
				operation = new UiOperationObj("ERROR", e.getMessage());
			e.printStackTrace();
		} finally {
			
			return operation;
		}
		
	}

}
