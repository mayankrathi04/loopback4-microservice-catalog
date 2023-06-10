import {expect, sinon} from '@loopback/testlab';
import {archiveLogs} from '../sample-data/archive-log';

import {mappingLog} from '../sample-data/mapping-log';
import {CustomFilter} from '../../models';
import {
  getTestControllers,
  getTestDBRepositories,
  givenEmptyTestDB,
  populateTestDB,
} from '../helpers/db.helper';

describe('POST /audit-logs/archive', () => {
  beforeEach(async () => {
    await givenEmptyTestDB();
    await populateTestDB();
  });
  it('archive logs when all 3 parameters are provided and deleted is false', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
      deleted: false,
      actedOn: 'Product',
    });

    const {archiveLogController, mappingLogRepository} = getTestControllers();

    // const exportResult = exportToCsvService.stubs.exportToCsv;
    // exportResult.resolves(uploaderResponse);

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);

    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();

    const expectedIds = ['3', '4', '5', '6'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    sinon.assert.match(controllerResult.numberOfEntriesArchived, 2);
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when all 3 parameters are provided and deleted is true', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
      deleted: true,
      actedOn: 'Product',
    });
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    // const exportResult = exportToCsvService.stubs.exportToCsv;
    // exportResult.resolves(uploaderResponse);

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '6'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when date parameter is not provided and deleted is true', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      deleted: true,
      actedOn: 'Product',
    });
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    // const exportResult = exportToCsvService.stubs.exportToCsv;
    // exportResult.resolves(uploaderResponse);

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '6'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when deleted parameter is not provided', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
      actedOn: 'Product',
    });
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    // const exportResult = exportToCsvService.stubs.exportToCsv;
    // exportResult.resolves(uploaderResponse);

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '5', '6'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when actedOn parameter is not provided and deleted is false', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
      deleted: false,
    });

    const {archiveLogController, mappingLogRepository} = getTestControllers();

    // const exportResult = exportToCsvService.stubs.exportToCsv;
    // exportResult.resolves(uploaderResponse);

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);

    const {auditLogRepository} = getTestDBRepositories();

    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '4', '5'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when actedOn parameter is not provided and deleted is true', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
      deleted: true,
    });
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '6'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when only actedOn parameter is provided', async () => {
    const customFilter: CustomFilter = new CustomFilter({
      date: {
        fromDate: new Date('2023-05-06T09:35:07.826Z'),
        toDate: new Date('2023-05-10T09:35:07.826Z'),
      },
    });
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    const expectedIds = ['3', '5'];

    expect(actualResult).to.be.containDeep(expectedIds.map(id => ({id})));
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
  it('archive logs when none of the parameter is provided', async () => {
    const customFilter: CustomFilter = new CustomFilter({});
    const {archiveLogController, mappingLogRepository} = getTestControllers();

    const mappingLogFetch = mappingLogRepository.stubs.create;
    mappingLogFetch.resolves(mappingLog);

    const controllerResult = await archiveLogController.archive(customFilter);
    const {auditLogRepository} = getTestDBRepositories();
    const actualResult = await auditLogRepository.find();
    expect(
      actualResult.length + controllerResult.numberOfEntriesArchived,
    ).to.be.equal(archiveLogs.length);
  });
});